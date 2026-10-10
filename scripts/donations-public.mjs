/**
 * 寄付データを公開用に絞る。
 * GAS の応答には累計額・寄付者ごとの金額・メッセージが含まれるが、
 * public/data/donations.json はサイトと一緒に公開されるため、画面で使う項目だけを残す。
 * 画面（pages/index.vue）が使う項目: fund / donors[].name / donors[].period / donors[].confirmedAt
 */
export function toPublicDonations(data) {
  return {
    fetchedAt: data.fetchedAt ?? null,
    fund: data.fund,
    donors: data.donors.map((d) => ({
      name: d.name,
      period: d.period,
      confirmedAt: d.confirmedAt,
    })),
  }
}
