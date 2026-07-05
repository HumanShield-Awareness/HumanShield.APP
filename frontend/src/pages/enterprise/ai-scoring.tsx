/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Blocks, Brain } from 'lucide-react'
import EnterprisePlaceholder from '../../components/EnterprisePlaceholder'
import { useI18n } from '../../i18n'

export default function AiScoringPage() {
  const { t } = useI18n()
  return (
    <EnterprisePlaceholder
      title={t('integrations.aiScoring')}
      icon={Brain}
      breadcrumb={[
        { label: t('nav.integrations'), icon: Blocks },
        { label: t('integrations.aiScoring'), icon: Brain },
      ]}
      tagline={t('ai.tagline')}
      intro={t('ai.intro')}
      features={[t('ai.f1'), t('ai.f2'), t('ai.f3')]}
    />
  )
}
