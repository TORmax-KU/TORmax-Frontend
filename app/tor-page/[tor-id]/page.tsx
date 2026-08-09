import Image from "next/image";

export default function TORPage() {
  return (
    <div style={{
      display: 'flex',
      gap: 30,
      padding: 80,
      paddingTop: 150
    }}>
      <div style={{
        backgroundColor: 'dimgray',
        width: '35%',
        height: 300,
        padding: 25
      }}>
        <>For more
          information link</>
        <>pdf link
        </>
        <>existing website</>
        <>Contacts</>
      </div>
      <div>
        Project Info
      </div>
    </div>
  );
}
