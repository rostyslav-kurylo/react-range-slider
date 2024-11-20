import './range-slider.scss';

export interface RangeSliderProps {
    min: number;
    max: number;
    value: number[];
    step?: number;
    onChange?: (data: number[]) => void;
}

const baseClassName = 'range-slider';
const DEFAULT_INPUT_RANGE_STEP = 1;
const getPercent = (_value: number, min: number, max: number) => ((_value - min) / (max - min)) * 100;
const getStyles = (min: number, max: number, minValue: number, maxValue: number): { left: string; width: string } => {
    const minPercent = getPercent(minValue, min, max);
    const maxPercent = getPercent(isFinite(maxValue) ? maxValue : max, min, max);

    const left = `${minPercent}%`;
    const width = `${maxPercent - minPercent}%`;

    return { left, width };
};

export const RangeSlider = ({
    min,
    max,
    step = DEFAULT_INPUT_RANGE_STEP,
    value,
    onChange,
}: RangeSliderProps): JSX.Element => {
    const trackStyles = getStyles(min, max, value[0], value[1]);

    const onInputRangeChange = (event: React.ChangeEvent<HTMLInputElement>, inputType: 'min' | 'max') => {
        const target = event.target;
        let currentValue = 0;

        if (inputType === 'min') {
            currentValue = Math.min(+target.value, value[1] - step);
            onChange && onChange([currentValue, value[1]]);
        }

        if (inputType === 'max') {
            currentValue = Math.max(+target.value, value[0] + step);
            onChange && onChange([value[0], currentValue]);
        }

        target.value = currentValue.toString();
    };

    return (
        <div className={baseClassName}>
            <div className={`${baseClassName}__track`} style={trackStyles} />

            <div className={`${baseClassName}__thumb`}>
                <input
                    type="range"
                    step={step}
                    style={value[0] >= (min + max) / 2 && { zIndex: 2 }}
                    min={min}
                    max={max}
                    value={value[0]}
                    onChange={(e) => onInputRangeChange(e, 'min')}
                />

                <input
                    type="range"
                    step={step}
                    min={min}
                    max={max}
                    value={value[1]}
                    onChange={(e) => onInputRangeChange(e, 'max')}
                />
            </div>
        </div>
    );
};

export default RangeSlider;
