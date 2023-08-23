export function Hamburger() {
  return (
    <svg
      aria-hidden="true"
      fill="gray"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className="block md:hidden cursor-pointer mr-2 "
    >
      <path d="M3 5h18q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-18q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293zM3 17h18q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-18q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293zM3 11h18q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-18q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293z"></path>
    </svg>
  );
}
export function Tick() {
  return (
    <svg
      aria-hidden="true"
      className="tickSVG"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
    </svg>
  );
}
export function Cross() {
  return (
    <svg
      aria-hidden="true"
      className="crossSVG"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
    </svg>
  );
}
export function DharmaLogo() {
  return (
    <img
      src="https://media.discordapp.net/attachments/959329505661554708/1136273342224138260/mitra-logo_3.png?width=662&height=662"
      width={20}
      height={20}
    />
  );
}
export function GptImage() {
  return <img src="/asset/ChatGPT.png" width={20} height={20} />;
}
