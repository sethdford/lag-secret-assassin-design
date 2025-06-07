// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "AssassinGameDesignSystem",
    platforms: [
        .iOS(.v16),
        .macOS(.v13),
        .watchOS(.v9),
        .tvOS(.v16)
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "AssassinGameDesignSystem",
            targets: ["AssassinGameDesignSystem"]
        ),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "AssassinGameDesignSystem",
            dependencies: [],
            path: "src",
            sources: [
                "components/"
            ]
        ),
        .testTarget(
            name: "AssassinGameDesignSystemTests",
            dependencies: ["AssassinGameDesignSystem"],
            path: "tests"
        ),
    ]
) 