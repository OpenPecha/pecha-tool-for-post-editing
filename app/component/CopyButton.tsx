import React, { useEffect, useState, useRef } from "react";
import { useToast } from "~/components/ui/use-toast";
import { CopySVG } from "~/style/svg/copy";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
let timer: NodeJS.Timeout;
import { CopyToClipboard } from "react-copy-to-clipboard";

type CopyButtonProps = {
  textToCopy: string | null;
};

function CopyButton({ textToCopy }: CopyButtonProps) {
  const { toast } = useToast();
  const [copy, setCopy] = useState(false);
  const handleCopied = () => {
    setCopy(true);
    // Optional: Remove the text selection after copying
    if (textToCopy?.length > 0)
      toast({
        description: "text is copied to clipboard",
      });
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopied}>
      <button>{copy ? <LuCopyCheck color="green" /> : <LuCopy />}</button>
    </CopyToClipboard>
  );
}

export default CopyButton;
