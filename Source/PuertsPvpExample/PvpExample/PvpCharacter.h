// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "PuertsPvpExampleCharacter.h"
#include "PvpCharacter.generated.h"

UCLASS()
class PUERTSPVPEXAMPLE_API APvpCharacter : public APuertsPvpExampleCharacter
{
	GENERATED_BODY()
protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	/**
	 * 处理连击攻击输入
	 */
	UFUNCTION(Server, Reliable)
	void ProcessComboAttack();

	UFUNCTION(BlueprintImplementableEvent)
	void TsProcessComboAttack();
public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

	UPROPERTY(EditAnywhere, Category ="Input", meta=(AllowPrivateAccess = "true"))
	UInputAction* ComboAttackAction;

	UPROPERTY(EditAnywhere, Category="Melee Attack|Combo")
	UAnimMontage* ComboAttackMontage;
};
