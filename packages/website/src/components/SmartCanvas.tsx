import { Canvas, type CanvasProps } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { isPlainObject } from "lodash-es";
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
        gl={
          props.gl === undefined || isPlainObject(props.gl)
            ? {
                // ACES (the default) crushes midtones on this dim studio scene
                toneMapping: NeutralToneMapping,
                ...props.gl,
              }
            : props.gl
        }
      />
    );
  }
);
