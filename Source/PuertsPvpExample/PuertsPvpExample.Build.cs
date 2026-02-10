// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

public class PuertsPvpExample : ModuleRules
{
	public PuertsPvpExample(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] {
			"Core",
			"CoreUObject",
			"Engine",
			"InputCore",
			"EnhancedInput",
			"AIModule",
			"StateTreeModule",
			"GameplayStateTreeModule",
			"UMG",
			"Slate"
		});

		PrivateDependencyModuleNames.AddRange(new string[] { });

		PublicIncludePaths.AddRange(new string[] {
			"PuertsPvpExample",
			"PuertsPvpExample/Variant_Platforming",
			"PuertsPvpExample/Variant_Platforming/Animation",
			"PuertsPvpExample/Variant_Combat",
			"PuertsPvpExample/Variant_Combat/AI",
			"PuertsPvpExample/Variant_Combat/Animation",
			"PuertsPvpExample/Variant_Combat/Gameplay",
			"PuertsPvpExample/Variant_Combat/Interfaces",
			"PuertsPvpExample/Variant_Combat/UI",
			"PuertsPvpExample/Variant_SideScrolling",
			"PuertsPvpExample/Variant_SideScrolling/AI",
			"PuertsPvpExample/Variant_SideScrolling/Gameplay",
			"PuertsPvpExample/Variant_SideScrolling/Interfaces",
			"PuertsPvpExample/Variant_SideScrolling/UI"
		});

		// Uncomment if you are using Slate UI
		// PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });

		// Uncomment if you are using online features
		// PrivateDependencyModuleNames.Add("OnlineSubsystem");

		// To include OnlineSubsystemSteam, add it to the plugins section in your uproject file with the Enabled attribute set to true
	}
}
