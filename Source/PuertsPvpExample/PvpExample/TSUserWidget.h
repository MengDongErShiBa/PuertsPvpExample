
#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "TSUserWidget.generated.h"

class UTSWidgetPrivate;

/**
 * BASE CLASS
 */
UCLASS()
class UTSUserWidget : public UUserWidget
{
	GENERATED_BODY()

public:
	UTSUserWidget(const FObjectInitializer& ObjectInitializer);

	UFUNCTION()
	virtual void NativeConstruct()override;
	virtual void NativeDestruct() override;
	virtual void NativePreConstruct()override;
	virtual void NativeTick(const FGeometry& MyGeometry, float InDeltaTime) override;

	void PostEditChangeProperty(struct FPropertyChangedEvent& PropertyChangedEvent);

	/**
	 * 获取Ts脚本对象
	 */
	UFUNCTION(BlueprintCallable)
	UTSWidgetPrivate* GetTSScript()const { return UMGTypeScript; }
private:
	void CreateTSScript();

public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TSubclassOf<UTSWidgetPrivate> TSClass;

private:
	UPROPERTY()
	UTSWidgetPrivate* UMGTypeScript;
};
