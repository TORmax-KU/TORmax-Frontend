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
                        <td><Link href='/tor-page/1'>
                        Project A
                        </Link></td>
                        <td>Approved</td>
                    </tr>
                    <tr>
                        <td><Link href='/tor-page/1'>
                        Project B
                        </Link></td>
                        <td>Applied</td>
                    </tr>
                    <tr>
                        <td><Link href='/tor-page/1'>
                        Project C
                        </Link></td>
                        <td>Rejected</td>
                    </tr>
                    <tr>
                        <td><Link href='/tor-page/1'>
                        Project D
                        </Link></td>
                        <td>Unavailable</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}