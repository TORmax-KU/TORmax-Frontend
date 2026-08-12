import Link from "next/link"

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
                        <Link href='/tor-page/1'>
                        <td>Project A</td>
                        </Link>
                        <td>Approved</td>
                    </tr>
                    <tr>
                        <Link href='/tor-page/1'>
                        <td>Project B</td>
                        </Link>
                        <td>Applied</td>
                    </tr>
                    <tr>
                        <Link href='/tor-page/1'>
                        <td>Project C</td>
                        </Link>
                        <td>Rejected</td>
                    </tr>
                    <tr>
                        <Link href='/tor-page/1'>
                        <td>Project D</td>
                        </Link>
                        <td>Unavailable</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}