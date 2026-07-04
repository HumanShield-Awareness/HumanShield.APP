"""Settings-Dashboard-Endpunkte (admin-only).

Aktuell: LDAP-Anbindung fuer den Empfaenger-Import. Weitere Einstellungs-
Abschnitte koennen hier als zusaetzliche Unter-Router andocken.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.permissions import require_admin
from app.database import get_db
from app.models import LdapConfig, OidcConfig, User
from app.schemas import (
    LdapConfigOut,
    LdapConfigUpdate,
    LdapTestResult,
    OidcConfigOut,
    OidcConfigUpdate,
)
from app.services.ldap import LdapParams, test_connection
from app.utils.crypto import decrypt, encrypt

router = APIRouter(prefix="/settings", tags=["settings"])


def get_or_create_ldap_config(db: Session) -> LdapConfig:
    """LDAP-Config ist ein Singleton: erste Zeile lesen oder Default anlegen."""
    config = db.query(LdapConfig).first()
    if config is None:
        config = LdapConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config


def get_or_create_oidc_config(db: Session) -> OidcConfig:
    config = db.query(OidcConfig).first()
    if config is None:
        config = OidcConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config


@router.get("/ldap", response_model=LdapConfigOut)
def get_ldap(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    return get_or_create_ldap_config(db)


@router.put("/ldap", response_model=LdapConfigOut)
def update_ldap(payload: LdapConfigUpdate, db: Session = Depends(get_db), _: User = Depends(require_admin)):
    config = get_or_create_ldap_config(db)
    data = payload.model_dump(exclude_unset=True)
    password = data.pop("bind_password", None)
    for field, value in data.items():
        setattr(config, field, value)
    if password is not None:
        # Leerer String -> Passwort entfernen; sonst neu verschluesseln.
        config.bind_password_encrypted = encrypt(password) if password else None
    db.commit()
    db.refresh(config)
    return config


@router.post("/ldap/test", response_model=LdapTestResult)
def test_ldap(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    """Testet die aktuell gespeicherte LDAP-Config (vorher speichern)."""
    config = get_or_create_ldap_config(db)
    password = decrypt(config.bind_password_encrypted) if config.bind_password_encrypted else None
    params = LdapParams(
        host=config.host,
        port=config.port,
        use_ssl=config.use_ssl,
        start_tls=config.start_tls,
        bind_dn=config.bind_dn,
        bind_password=password,
        base_dn=config.base_dn,
        user_filter=config.user_filter,
        attr_email=config.attr_email,
        attr_first_name=config.attr_first_name,
        attr_last_name=config.attr_last_name,
    )
    success, detail = test_connection(params)
    return LdapTestResult(success=success, detail=detail)


@router.get("/oidc", response_model=OidcConfigOut)
def get_oidc(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    return get_or_create_oidc_config(db)


@router.put("/oidc", response_model=OidcConfigOut)
def update_oidc(payload: OidcConfigUpdate, db: Session = Depends(get_db), _: User = Depends(require_admin)):
    config = get_or_create_oidc_config(db)
    data = payload.model_dump(exclude_unset=True)
    secret = data.pop("client_secret", None)
    for field, value in data.items():
        setattr(config, field, value)
    if secret is not None:
        config.client_secret_encrypted = encrypt(secret) if secret else None
    db.commit()
    db.refresh(config)
    return config
