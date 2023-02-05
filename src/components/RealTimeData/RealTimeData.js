import { app } from "../../firebase";
import React from "react";
import {
  ref,
  onValue,
  getDatabase,
  set,
  get,
  update,
  push,
  child,
} from "firebase/database";
import { Table } from "react-bootstrap";

const db = getDatabase(app);

export class RealTimeData extends React.Component {
  constructor() {
    super();
    this.state = {
      tabledata: [],
    };
  }

  componentDidMount() {
    const dbRef = ref(db, "Animal_1");

    onValue(dbRef, (snapshot) => {
      let records = [];
      [snapshot].forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      console.log(records);
      this.setState({ tabledata: records }, () => {
        console.log("state check");
        console.log(this.state.tabledata);
      });
    });
  }

  render() {
    console.log(this.state.tabledata);

    return (
      <Table className="container w-75" bordered striped variant="dark">
        <tbody>
          <tr>
            <th>#</th>
            <th>Type</th>
            {/* <th>Acceleration X</th>
            <th>Acceleration Y</th>
            <th>Acceleration Z</th>
            <th>Gyroscope X</th>
            <th>Gyroscope Y</th>
            <th>Gyroscope Z</th> */}
            <th>Animal Activity</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Name</th>
            <th>Temperature</th>
          </tr>
        </tbody>

        <tbody>
          {this.state.tabledata.map((row, index) => {
            return (
              <tr>
                <td>{index}</td>
                <td>{row.key}</td>
                {/* <td>{row.data["Acceleration X"]}</td>
                <td>{row.data["Acceleration Y"]}</td>
                <td>{row.data["Acceleration Z"]}</td> */}
                {/* <td>{row.data['Encodings']}</td> */}
                {/* <td>{row.data["Gyroscope X"]}</td>
                <td>{row.data["Gyroscope Y"]}</td>
                <td>{row.data["Gyroscope Z"]}</td> */}
                <td>{row.data["Action"]}</td>
                <td>{row.data["Latitude"]}</td>
                <td>{row.data["Longitude"]}</td>
                <td>{row.data["Name"]}</td>
                <td>{row.data["Temperature"]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
