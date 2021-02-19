export const Statistic = ({ text, value, icon }) => (
  <>
    <td>{ icon } { text }</td>
    <td><strong>{ value } { text === 'positive' && '%'}</strong></td>
  </>
)