// Fill out your copyright notice in the Description page of Project Settings.


#include "PvpBlueprintFunctionLibrary.h"

#include "PvpCharacter.h"
#include "Engine/World.h"

TArray<FHitResult> UPvpBlueprintFunctionLibrary::CheckEnemyInRange(APvpCharacter* PvpCharacter, float Range)
{
	TArray<FHitResult> OutHits;
	UWorld* World;

	if (!PvpCharacter)
	{
		UE_LOG(LogTemp, Error, TEXT("[UPvpBlueprintFunctionLibrary::CheckEnemyInRange]: PvpCharacter is null"));
		return OutHits;
	}

	World = PvpCharacter->GetWorld();
	if (!World)
	{
		UE_LOG(LogTemp, Error, TEXT("[UPvpBlueprintFunctionLibrary::CheckEnemyInRange]: World is null"));
		return OutHits;
	}

	// 向前检测
	const FVector TraceStart = PvpCharacter->GetActorLocation();
	const FVector TraceEnd = TraceStart + (PvpCharacter->GetActorForwardVector() * Range);

	// 只检查Pawn
	FCollisionObjectQueryParams ObjectParams;
	ObjectParams.AddObjectTypesToQuery(ECC_Pawn);

	FCollisionShape CollisionShape;
	CollisionShape.SetSphere(Range);

	// 忽略自己
	FCollisionQueryParams QueryParams;
	QueryParams.AddIgnoredActor(PvpCharacter);

	World->SweepMultiByObjectType(OutHits, TraceStart, TraceEnd, FQuat::Identity, ObjectParams, CollisionShape, QueryParams);
	return OutHits;
}
