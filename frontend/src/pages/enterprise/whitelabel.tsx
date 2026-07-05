/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Blocks, Palette } from 'lucide-react'
import EnterprisePlaceholder from '../../components/EnterprisePlaceholder'
import { useI18n } from '../../i18n'

export default function WhiteLabelPage() {
  const { t } = useI18n()
  return (
    <EnterprisePlaceholder
      title={t('integrations.whiteLabel')}
      icon={Palette}
      breadcrumb={[
        { label: t('nav.integrations'), icon: Blocks },
        { label: t('integrations.whiteLabel'), icon: Palette },
      ]}
      tagline={t('wl.tagline')}
      intro={t('wl.intro')}
      features={[t('wl.f1'), t('wl.f2'), t('wl.f3')]}
    />
  )
}
