import Image from "next/image";

export default function TORPage() {
  return (
    <div style={{
      display: 'flex',
      gap: 30,
      padding: 80,
      paddingTop: 150
    }}>
      <aside className="w-[35%] shrink-0">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-3">
            <h2 className="card-title text-lg">Resources</h2>

            <a href="#" className="link link-primary">
              For more information
            </a>

            <a href="#" className="btn btn-sm btn-outline btn-primary w-full">
              <svg xmlns="[W3](http://www.w3.org/2000/svg)" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                Download TOR (PDF)
              </svg>
            </a>

            <a href="#" className="link link-primary">
              Existing website
            </a>

            <div className="divider my-1"></div>

            <h3 className="font-semibold text-sm">Contacts</h3>
            <ul className="text-sm space-y-1">
              <li>📧 tor@example.org</li>
              <li>📞 +66 000 000 000</li>
              <li>🌐 www.example.org</li>
            </ul>
          </div>
        </div>
      </aside >

      <div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="badge badge-primary badge-outline mb-2">Reference: TOR-2026-001</div>
            <h1 className="card-title text-3xl">Terms of Reference</h1>
            <p className="text-base-content/70">
              Digital Skills Training for Rural Youth — 12-month implementation
            </p>

            {/* Project Info */}
            <section className="mt-4">
              <h2 className="text-xl font-bold mb-3">Project Information</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <tbody>
                    <tr><td className="font-semibold w-1/3">Project Title</td><td>Digital Skills Training for Rural Youth</td></tr>
                    <tr><td className="font-semibold">Location</td><td>Northern Region, Thailand</td></tr>
                    <tr><td className="font-semibold">Duration</td><td>12 months</td></tr>
                    <tr><td className="font-semibold">Budget Range</td><td>USD 120,000 – 150,000</td></tr>
                    <tr><td className="font-semibold">Expected Start</td><td>October 2026</td></tr>
                    <tr><td className="font-semibold">Submission Deadline</td><td>15 September 2026, 17:00 ICT</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Context */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-2">Context</h2>
              <p>
                Youth unemployment in the northern region stands at 18%, with limited
                access to digital skills in rural areas. This project addresses the gap
                by delivering a certified 12-week digital literacy program to 500 young
                people, training 20 local facilitators, and establishing a sustainable
                community training hub.
              </p>
            </section>

            {/* Objectives */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-2">Objectives</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Deliver a 12-week certified digital literacy curriculum</li>
                <li>Train 20 local facilitators to sustain delivery</li>
                <li>Establish a permanent community training hub</li>
              </ul>
            </section>

            {/* Scope */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-2">Scope of Work</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>Conduct a needs assessment of the target communities</li>
                <li>Develop localized training materials</li>
                <li>Deliver training sessions across 10 sites</li>
                <li>Monitor progress and produce outcome reports</li>
              </ol>
            </section>

            {/* Deliverables */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-3">Deliverables</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Deliverable</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Inception report</td><td>Nov 2026</td></tr>
                    <tr><td>2</td><td>Training materials (draft)</td><td>Dec 2026</td></tr>
                    <tr><td>3</td><td>Training delivery completed</td><td>Jul 2027</td></tr>
                    <tr><td>4</td><td>Final report</td><td>Sep 2027</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Timeline */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-3">Timeline</h2>
              <ul className="steps steps-vertical lg:steps-horizontal">
                <li className="step step-primary">Phase 1: Preparation</li>
                <li className="step step-primary">Phase 2: Implementation</li>
                <li className="step step-primary">Phase 3: Reporting</li>
              </ul>
            </section>

            {/* Evaluation criteria */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-2">Evaluation Criteria</h2>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-lg badge-outline">Technical approach — 50%</div>
                <div className="badge badge-lg badge-outline">Relevant experience — 30%</div>
                <div className="badge badge-lg badge-outline">Budget — 20%</div>
              </div>
            </section>

            {/* Contact */}
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-2">Contact & Further Information</h2>
              <p>
                For questions, contact <strong>Jane Doe</strong> at{" "}
                <a href="mailto:tor@example.org" className="link link-primary">tor@example.org</a>{" "}
                or +66 000 000 000. Full details are available in the{" "}
                <a href="#" className="link link-primary">TOR PDF</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div >
  );
}
