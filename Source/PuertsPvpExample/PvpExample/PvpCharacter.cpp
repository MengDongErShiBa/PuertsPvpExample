// Fill out your copyright notice in the Description page of Project Settings.


#include "PvpCharacter.h"

#include "EnhancedInputComponent.h"


// Called when the game starts or when spawned
void APvpCharacter::BeginPlay()
{
	Super::BeginPlay();
	
}

void APvpCharacter::ProcessComboAttack_Implementation()
{
	TsProcessComboAttack();
}

// Called every frame
void APvpCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

// Called to bind functionality to input
void APvpCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	if (UEnhancedInputComponent* EnhancedInputComponent = Cast<UEnhancedInputComponent>(PlayerInputComponent))
	{
		// 处理攻击输入
		EnhancedInputComponent->BindAction(ComboAttackAction, ETriggerEvent::Started, this, &ThisClass::ProcessComboAttack);
	}
}

