export default function TrackingProjects() {
    return (
        <div style={{
            width: '35%',
            padding: 15,
            paddingLeft: 25
        }}>

            Tracked Projects

            <table className="table">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Project A</td>
                        <td>Approved</td>
                    </tr>
                    <tr>
                        <td>Project B</td>
                        <td>Applied</td>
                    </tr>
                    <tr>
                        <td>Project C</td>
                        <td>Rejected</td>
                    </tr>
                    <tr>
                        <td>Project D</td>
                        <td>Unavailable</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}