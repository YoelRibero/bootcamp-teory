import { Statistic } from './Statistic'

export const Statistics = ({ feedback: { good, neutral, bad, all }, average, positive }) => {
  return (
    <table>
      <tbody>
        <tr><Statistic icon='👍' text='good' value={ good } /></tr>
        <tr><Statistic icon='🤷‍♂️' text='neutral' value={ neutral } /></tr>
        <tr><Statistic icon='👎' text='bad' value={ bad } /></tr>
        <tr><Statistic icon='📌' text='all' value={ all } /></tr>
        <tr><Statistic icon='📊' text='average' value={ average.toFixed(1) } /></tr>
        <tr><Statistic icon='✅' text='positive' value={ positive.toFixed(1) } /></tr>
      </tbody>
    </table>
  )
}