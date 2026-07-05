/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Blocks, Building2 } from 'lucide-react'
import EnterprisePlaceholder from '../../components/EnterprisePlaceholder'
import { useI18n } from '../../i18n'

export default function MultiTenantPage() {
  const { t } = useI18n()
  return (
    <EnterprisePlaceholder
      title={t('integrations.multiTenant')}
      icon={Building2}
      breadcrumb={[
        { label: t('nav.integrations'), icon: Blocks },
        { label: t('integrations.multiTenant'), icon: Building2 },
      ]}
      tagline={t('mt.tagline')}
      intro={t('mt.intro')}
      features={[t('mt.f1'), t('mt.f2'), t('mt.f3')]}
    />
  )
}
