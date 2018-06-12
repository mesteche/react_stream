import './Grid.css'

// prettier-ignore
const Grid = ({ state, ...props }) => (
  <table>
    <tbody>{state.map(r =>
      <tr key={r.id}>{r.cols.map(c => 
        <td key={c.id}>{c.value}</td>)}
      </tr>)}
    </tbody>
  </table>
)

export default Grid
