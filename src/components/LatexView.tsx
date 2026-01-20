import React from 'react';
import {
    requireNativeComponent,
    ViewStyle,
    NativeSyntheticEvent,
    StyleProp,
} from 'react-native';

interface LatexErrorEvent {
    error: string;
}

export interface LatexViewProps {
    /**
     * LaTeX expression to render
     * @example "$x^2 + y^2 = z^2$"
     * @example "$\\frac{a}{b}$"
     */
    latex: string;

    /**
     * Text size in density-independent pixels
     * @default 16
     */
    textSize?: number;

    /**
     * Text color in hex format
     * @default "#000000"
     */
    textColor?: string;

    /**
     * Background color in hex format
     * @default transparent
     */
    backgroundColor?: string;

    /**
     * Callback fired when LaTeX renders successfully
     */
    onLoad?: () => void;

    /**
     * Callback fired when LaTeX rendering fails
     */
    onError?: (error: string) => void;

    /**
     * Additional view styles
     */
    style?: StyleProp<ViewStyle>;
}

interface NativeLatexViewProps extends Omit<LatexViewProps, 'onError'> {
    onError?: (event: NativeSyntheticEvent<LatexErrorEvent>) => void;
}

const NativeLatexView =
    requireNativeComponent<NativeLatexViewProps>('LatexView');

export const LatexView: React.FC<LatexViewProps> = ({
    latex,
    textSize = 16,
    textColor = '#000000',
    backgroundColor,
    onLoad,
    onError,
    style,
}) => {
    const handleError = React.useCallback(
        (event: NativeSyntheticEvent<LatexErrorEvent>) => {
            if (onError) {
                onError(event.nativeEvent.error);
            }
        },
        [onError]
    );

    return (
        <NativeLatexView
            latex={latex}
            textSize={textSize}
            textColor={textColor}
            backgroundColor={backgroundColor}
            onLoad={onLoad}
            onError={handleError}
            style={style}
        />
    );
};

export default LatexView;
