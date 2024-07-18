import {useState} from "react";
import {FormControl, FormLabel, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip} from "@chakra-ui/react";

interface SliderWithTooltipProps {
  state: number;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  tooltipLabel: string;
  setState: (s: number) => void;
}

export default function SliderWithTooltip({setState, label, min=0, max=100, step=1, tooltipLabel, state}: SliderWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Slider
        defaultValue={state}
        min={min}
        max={max}
        step={step}
        colorScheme="brand"
        onChange={(v) => setState(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="z-0"
      >
        <SliderTrack>
          <SliderFilledTrack/>
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="brand.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${state} ${tooltipLabel}`}
        >
          <SliderThumb boxSize={6}  className="z-10" />
        </Tooltip>
      </Slider>
    </FormControl>
  );
}