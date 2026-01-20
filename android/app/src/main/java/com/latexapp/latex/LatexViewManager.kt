package com.latexapp.latex

import android.graphics.Color
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

/**
 * ViewManager for LatexView that bridges React Native props to the native view.
 */
class LatexViewManager(private val reactContext: ReactApplicationContext) : 
    SimpleViewManager<LatexView>() {
    
    override fun getName(): String = "LatexView"
    
    override fun createViewInstance(context: ThemedReactContext): LatexView {
        return LatexView(context)
    }
    
    /**
     * Set the LaTeX expression prop
     */
    @ReactProp(name = "latex")
    fun setLatex(view: LatexView, latex: String?) {
        view.setLatex(latex ?: "")
    }
    
    /**
     * Set the text size prop (in pixels)
     */
    @ReactProp(name = "textSize", defaultFloat = 16f)
    fun setTextSize(view: LatexView, textSize: Float) {
        // Convert from density-independent pixels to actual pixels
        val density = view.resources.displayMetrics.density
        view.setTextSize(textSize * density)
    }
    
    /**
     * Set the text color prop (hex string)
     */
    @ReactProp(name = "textColor")
    fun setTextColor(view: LatexView, color: String?) {
        try {
            val colorInt = if (color != null) Color.parseColor(color) else Color.BLACK
            view.setTextColor(colorInt)
        } catch (e: IllegalArgumentException) {
            // Invalid color format, use default
            view.setTextColor(Color.BLACK)
        }
    }
    
    /**
     * Set the background color prop (hex string)
     */
    @ReactProp(name = "backgroundColor")
    fun setBackgroundColor(view: LatexView, color: String?) {
        try {
            val colorInt = if (color != null) Color.parseColor(color) else Color.TRANSPARENT
            view.setBackgroundColorInt(colorInt)
        } catch (e: IllegalArgumentException) {
            // Invalid color format, use default
            view.setBackgroundColorInt(Color.TRANSPARENT)
        }
    }
    
    /**
     * Export event types to React Native
     */
    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
            "onLoad", MapBuilder.of("registrationName", "onLoad"),
            "onError", MapBuilder.of("registrationName", "onError")
        )
    }
}
