import React, { useRef, useCallback } from "react";
import ActionSheet from "@gorhom/bottom-sheet";

export function BottomSheet({ children, snapPoints = ["50%", "75%"] }) {
  const bottomSheetRef = useRef<ActionSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <ActionSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: "#140A0F",
        borderWidth: 1,
        borderColor: "#DE984F",
      }}
    >
      {children}
    </ActionSheet>
  );
}
