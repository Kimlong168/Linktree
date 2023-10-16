import {
    TelegramShareButton,
    TelegramIcon,
    FacebookShareButton,
    FacebookIcon,
    LineShareButton,
    LineIcon,
    TwitterShareButton,
    TwitterIcon,
  } from "react-share";
  
  const SharingButton = ({ url, title }) => {
    return (
      <div className="pb-5">
        <div className="font-semibold text-center text-white p-4">Share this link tree</div>
        <div className="flex gap-2 justify-center p-2">
          <TelegramShareButton url={url} title={`====${title}====`}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <FacebookShareButton
            url={url}
            hashtag="#kimlong"
            quote={`====${title}====`}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LineShareButton url={url} title={`====${title}====`}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <TwitterShareButton url={url} title={`====${title}====`}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
      </div>
    );
  };
  export default SharingButton;
  