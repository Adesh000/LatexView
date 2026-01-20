package com.latexapp.latex

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import ru.noties.jlatexmath.JLatexMathDrawable

/**
 * Custom Android View that renders LaTeX expressions using JLaTeXMath.
 * Ensures deterministic rendering and graceful error handling.
 */
class LatexView(context: Context) : FrameLayout(context) {
    
    private val imageView: ImageView = ImageView(context)
    private val errorTextView: TextView = TextView(context)
    
    private var latexExpression: String = ""
    private var textSizePx: Float = 16f * resources.displayMetrics.density
    private var textColorInt: Int = Color.BLACK
    private var backgroundColorInt: Int = Color.TRANSPARENT
    
    init {
        // Set up the image view for rendered LaTeX
        imageView.scaleType = ImageView.ScaleType.CENTER_INSIDE
        addView(imageView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
        
        // Set up error text view (hidden by default)
        errorTextView.visibility = GONE
        errorTextView.setTextColor(Color.RED)
        errorTextView.setPadding(16, 16, 16, 16)
        addView(errorTextView, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT))
    }
    
    /**
     * Set the LaTeX expression to render
     */
    fun setLatex(latex: String) {
        if (latexExpression != latex) {
            latexExpression = latex
            renderLatex()
        }
    }
    
    /**
     * Set the text size in pixels
     */
    fun setTextSize(size: Float) {
        if (textSizePx != size) {
            textSizePx = size
            renderLatex()
        }
    }
    
    /**
     * Set the text color
     */
    fun setTextColor(color: Int) {
        if (textColorInt != color) {
            textColorInt = color
            renderLatex()
        }
    }
    
    /**
     * Set the background color
     */
    fun setBackgroundColorInt(color: Int) {
        if (backgroundColorInt != color) {
            backgroundColorInt = color
            setBackgroundColor(color)
            renderLatex()
        }
    }
    
    /**
     * Render the LaTeX expression to a bitmap
     */
    private fun renderLatex() {
        if (latexExpression.isEmpty()) {
            imageView.setImageBitmap(null)
            hideError()
            return
        }
        
        try {
            // Create JLaTeXMath drawable
            val drawable = JLatexMathDrawable.builder(latexExpression)
                .textSize(textSizePx)
                .color(textColorInt)
                .align(JLatexMathDrawable.ALIGN_CENTER)
                .padding(8)
                .build()
            
            // Calculate dimensions for the bitmap
            val width = drawable.intrinsicWidth
            val height = drawable.intrinsicHeight
            
            if (width <= 0 || height <= 0) {
                throw IllegalArgumentException("Invalid LaTeX expression resulted in zero dimensions")
            }
            
            // Create bitmap with deterministic size
            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)
            
            // Fill background if not transparent
            if (backgroundColorInt != Color.TRANSPARENT) {
                canvas.drawColor(backgroundColorInt)
            }
            
            // Set drawable bounds and draw
            drawable.setBounds(0, 0, width, height)
            drawable.draw(canvas)
            
            // Set the bitmap to the image view
            imageView.setImageBitmap(bitmap)
            hideError()
            
            // Send onLoad event to React Native
            sendEvent("onLoad", Arguments.createMap())
            
        } catch (e: Exception) {
            // Handle error gracefully - show error message instead of crashing
            val errorMessage = "LaTeX Error: ${e.message ?: "Unknown error"}"
            showError(errorMessage)
            
            // Send onError event to React Native
            val errorData = Arguments.createMap()
            errorData.putString("error", errorMessage)
            sendEvent("onError", errorData)
        }
    }
    
    /**
     * Show error message in the view
     */
    private fun showError(message: String) {
        imageView.setImageBitmap(null)
        errorTextView.text = message
        errorTextView.visibility = VISIBLE
    }
    
    /**
     * Hide error message
     */
    private fun hideError() {
        errorTextView.visibility = GONE
    }
    
    /**
     * Send events to React Native
     */
    private fun sendEvent(eventName: String, params: com.facebook.react.bridge.WritableMap) {
        val reactContext = context as? ReactContext ?: return
        reactContext
            .getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(id, eventName, params)
    }
    
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        
        // Ensure we have reasonable dimensions
        val width = MeasureSpec.getSize(widthMeasureSpec)
        val height = MeasureSpec.getSize(heightMeasureSpec)
        
        setMeasuredDimension(
            resolveSize(width, widthMeasureSpec),
            resolveSize(height, heightMeasureSpec)
        )
    }
}
