import { RiAddCircleFill, RiFileList2Line } from "@remixicon/react";
import Link from "next/link";
import { DetailedVersion } from "./ProjectListing";

export default function ProjectListingItem({ detailed = false }: DetailedVersion) {
    // accept TOR obj
    return (
        <Link href="/tor-page/1" style={{
            width: '100%'
        }}>
            <li className="list-row" style={{
                width: '100%'
            }}>
                <div><RiFileList2Line /></div>
                <div>
                    <div className="font-semibold text-base truncate w-[150px]">Digital Skills Training for Rural Youth</div>
                    <div className="text-xs uppercase font-semibold opacity-60">Employer</div>
                </div>
                {detailed ?
                    (<div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs opacity-70">
                        <span className=" overflow-y-auto">📍 Northern Region, Thailand</span>
                    </div>) : (null)
                }

                <button className="btn btn-square btn-ghost">
                    <RiAddCircleFill />
                </button>
                <button className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>

            </li>
        </Link >
    )
}