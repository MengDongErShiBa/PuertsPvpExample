// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "PvpBlueprintFunctionLibrary.generated.h"

struct FHitResult;
class APvpCharacter;
/**
 * 
 */
UCLASS()
class PUERTSPVPEXAMPLE_API UPvpBlueprintFunctionLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()
public:
	UFUNCTION(BlueprintCallable, Category = "Pvp")
	static TArray<FHitResult> CheckEnemyInRange(APvpCharacter* PvpCharacter, float Range);
};
