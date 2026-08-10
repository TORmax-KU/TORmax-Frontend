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
        <div>For more
          information link</div>
        <div>pdf link
        </div>
        <div>existing website</div>
        <div>Contacts</div>
      </div>
      <div>
        Project Info
      </div>
    </div>
  );
}
