import Foundation
import AppKit
import CoreGraphics

guard CommandLine.arguments.count >= 3 else {
    print("Usage: swift remove-icon-alpha.swift <input.png> <output.png> [hexBgColor]")
    exit(1)
}

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]
let hexColor = CommandLine.arguments.count >= 4 ? CommandLine.arguments[3] : "1b4332"

guard let image = NSImage(contentsOfFile: inputPath) else {
    print("Failed to load image: \(inputPath)")
    exit(1)
}

let size = CGSize(width: 1024, height: 1024)
let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)!
let bitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.noneSkipLast.rawValue)

guard let context = CGContext(
    data: nil,
    width: Int(size.width),
    height: Int(size.height),
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: colorSpace,
    bitmapInfo: bitmapInfo.rawValue
) else {
    print("Failed to create CGContext")
    exit(1)
}

var r: CGFloat = 27.0 / 255.0
var g: CGFloat = 67.0 / 255.0
var b: CGFloat = 50.0 / 255.0

if hexColor.count == 6 {
    let scanner = Scanner(string: hexColor)
    var hexNum: UInt64 = 0
    if scanner.scanHexInt64(&hexNum) {
        r = CGFloat((hexNum & 0xFF0000) >> 16) / 255.0
        g = CGFloat((hexNum & 0x00FF00) >> 8) / 255.0
        b = CGFloat(hexNum & 0x0000FF) / 255.0
    }
}

context.setFillColor(red: r, green: g, blue: b, alpha: 1.0)
context.fill(CGRect(origin: .zero, size: size))

if let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) {
    context.draw(cgImage, in: CGRect(origin: .zero, size: size))
}

guard let finalCGImage = context.makeImage() else {
    print("Failed to make CGImage")
    exit(1)
}

let newRep = NSBitmapImageRep(cgImage: finalCGImage)
guard let pngData = newRep.representation(using: .png, properties: [:]) else {
    print("Failed to encode PNG")
    exit(1)
}

do {
    try pngData.write(to: URL(fileURLWithPath: outputPath))
    print("Successfully generated non-alpha icon at \(outputPath)")
} catch {
    print("Write failed: \(error)")
    exit(1)
}
