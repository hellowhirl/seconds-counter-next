import styles from "../page.module.css";

interface RecordsProps {
  records: {
    goalTime: number;
    resultTime: number;
    difference: number;
  }[];
  setShowRecords: (arg1: boolean) => void;
  setShowTimer: (arg1: boolean) => void;
  setShowSettingsButtons: (arg1: boolean) => void;
  setShowMessageArea: (arg1: boolean) => void;
}

const Records: React.FC<RecordsProps> = ({
  records,
  setShowRecords,
  setShowTimer,
  setShowSettingsButtons,
  setShowMessageArea,
}) => {
  return (
    <>
      <div
        className={styles.arrowLeft}
        onClick={() => {
          setShowRecords(false);
          setShowTimer(true);
          setShowSettingsButtons(true);
          setShowMessageArea(true);
        }}
      ></div>
      <h2 className={styles.pageTitle}>RECORDS</h2>
      <div className={styles.tableOutter}>
        <table className={styles.recordsTable}>
          <thead>
            <tr>
              <th>GOAL</th>
              <th>RESULT</th>
              <th>GAP</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>
                  {record.goalTime / 1000}
                  <span className={styles.spacer}></span>s
                </td>
                <td>{(record.resultTime / 1000).toFixed(2)}</td>
                <td>
                  {((record.goalTime - record.resultTime) / 1000).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      {records.length === 0 && <div>No records yet</div>}
    </>
  );
};

export default Records;
