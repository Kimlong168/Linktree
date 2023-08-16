import React, { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
uuidv4();
const QrCodeLink = ({ url, name }) => {
  const [showQrCode, setShowQrCode] = useState(false);

  function downloadQr() {
    html2canvas(document.querySelector("#qrcode")).then(function (canvas) {
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      console.log(a.href, "and", a);
      a.download = `link_tree_${name}_${uuidv4()}.png`;
      a.click();
    });
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-5 pt-4">
        {showQrCode && (
          <div>
            <div
              className={`w-[145px] py-[10px] mx-auto flex flex-col justify-center items-center bg-white rounded`}
              id="qrcode"
            >
              <QRCode size={125} value={url} />
            </div>

            <button
              onClick={downloadQr}
              className="text-green-600 font-bold py-2 px-4 rounded-full inline-flex items-center mt-3 border border-green-600"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="green"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span> Download Qrcode</span>
            </button>
          </div>
        )}

        <button
          className="px-3 py-2 rounded-full border border-white text-white"
          onClick={() => setShowQrCode((a) => !a)}
        >
          {!showQrCode ? "Show QrCode" : "Hide QrCode"}
        </button>
      </div>
    </div>
  );
};

export default QrCodeLink;
