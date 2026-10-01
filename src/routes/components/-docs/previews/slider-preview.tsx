import { Field, FieldDescription, FieldLabel } from '#/components/ui/field'
import { Slider } from '#/components/ui/slider'

import {
  Chapter,
  FillPreview,
  SpecimenList,
  SpecimenRow,
  type SpecimenRowProps
} from './preview-primitives'

function SliderFillRow({
  children,
  className,
  ...props
}: SpecimenRowProps & {
  className?: string
}) {
  return (
    <SpecimenRow {...props}>
      <FillPreview className={className}>{children}</FillPreview>
    </SpecimenRow>
  )
}

export function SliderPreview() {
  return (
    <div className="flex w-full flex-col">
      <Chapter
        title="Slider"
        description="Horizontal range input with value bubble on focus and drag. Default variant is simple."
      >
        <SpecimenList>
          <SliderFillRow label="Simple">
            <Slider
              defaultValue={0.7}
              min={0}
              max={1}
              step={0.1}
              aria-label="Temperature"
            />
          </SliderFillRow>
          <SliderFillRow label="Disabled" token="disabled">
            <Slider
              defaultValue={0.7}
              min={0}
              max={1}
              step={0.1}
              disabled
              aria-label="Temperature disabled"
            />
          </SliderFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="Variants"
        description="Segmented track with tick mask and hover preview; vertical orientation; range via array value."
      >
        <SpecimenList>
          <SliderFillRow label="Segmented" token='variant="segmented"'>
            <Slider variant="segmented" defaultValue={50} aria-label="Volume" />
          </SliderFillRow>
          <SliderFillRow
            label="Vertical"
            token='orientation="vertical"'
            className="@sm/specimen:w-fit @sm/specimen:max-w-none"
          >
            <Slider
              orientation="vertical"
              defaultValue={60}
              aria-label="Level"
            />
          </SliderFillRow>
          <SliderFillRow label="Range">
            <Slider defaultValue={[25, 75]} aria-label="Quota range" />
          </SliderFillRow>
          <SliderFillRow label="Segmented range">
            <Slider
              variant="segmented"
              defaultValue={[25, 75]}
              aria-label="Quota range segmented"
            />
          </SliderFillRow>
        </SpecimenList>
      </Chapter>

      <Chapter
        title="In context"
        description="Temperature control from agent registration with label and helper copy."
      >
        <SpecimenList>
          <SliderFillRow label="Temperature">
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="preview-slider-temperature">
                  Temperature
                </FieldLabel>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  0.7
                </span>
              </div>
              <Slider
                id="preview-slider-temperature"
                defaultValue={0.7}
                min={0}
                max={1}
                step={0.1}
                aria-label="Temperature"
              />
              <FieldDescription>
                Lower values are more deterministic; higher values are more
                creative.
              </FieldDescription>
            </Field>
          </SliderFillRow>
        </SpecimenList>
      </Chapter>
    </div>
  )
}
