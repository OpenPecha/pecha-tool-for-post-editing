import { useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { Card, CardDescription } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
type TextViewType = {
  text: string;
  setMainText: (data: string) => void;
  color?: string;
  children?: React.ReactNode;
};
function TextView({ text, setMainText, color, children }: TextViewType) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [text]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setMainText(value);
  };

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const debouncedAdjustHeight = useRef(
    debounce(adjustTextAreaHeight, 300)
  ).current;

  return (
    <Card className="overflow-hidden ">
      <CardDescription className="px-2" style={{ backgroundColor: color }}>
        Source text
      </CardDescription>
      <Textarea
        className="bg-white overflow-hidden w-full border-none"
        style={{ resize: "vertical", fontSize: 18 }}
        placeholder="Enter/paste your text here"
        value={text || ""}
        rows={4}
        onChange={handleTextChange}
        ref={textAreaRef}
        onInput={debouncedAdjustHeight}
      />
      {children}
    </Card>
  );
}

export default TextView;
