/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Blocks, LayoutGrid } from 'lucide-react'
import PageScaffold from '../../components/PageScaffold'
import { useI18n } from '../../i18n'

export default function IntegrationsOverviewPage() {
  const { t } = useI18n()
  return (
    <PageScaffold
      title={t('nav.integrations')}
      subtitle={t('io.subtitle')}
      breadcrumb={[
        { label: t('nav.integrations'), icon: Blocks },
        { label: t('integrations.overview'), icon: LayoutGrid },
      ]}
    >
      <div className="w-fit max-w-full rounded-lg border border-dashed border-border bg-surface p-6 text-sm text-text-secondary">
        <p className="font-medium text-text-primary">{t('io.noneTitle')}</p>
        <p className="mt-2 max-w-md">{t('io.noneBody')}</p>
      </div>
    </PageScaffold>
  )
}
