import { Canvas, type CanvasProps } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { NeutralToneMapping } from "three";
import { useOnScreen } from "../hooks/useOnScreen";

export const SmartCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (props, ref) => {
    const canvas = useRef<HTMLCanvasElement>(null!);
    const onScreen = useOnScreen(canvas);

    useImperativeHandle(ref, () => canvas.current!, []);

    return (
      <Canvas
        frameloop={onScreen ? "demand" : "never"}
        ref={canvas}
        {...props}
        gl={{
          // ACES (the default) crushes midtones on this dim studio scene
          toneMapping: NeutralToneMapping,
          ...(typeof props.gl === "object" ? props.gl : {}),
        }}
      />
    );
  }
);
