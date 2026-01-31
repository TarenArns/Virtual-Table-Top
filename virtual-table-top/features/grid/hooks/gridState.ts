import { useState, useReducer, useCallback } from "react";
import { gridItem, gridMode } from "../types/types";
import { gridReducer, buildGrid } from "../utils/utils";

export function useGridState(items: gridItem[], dimensions: { rows: number; columns: number }, src: string) {
    const [selectedItem, setSelectedItem] = useState<gridItem | null>(null);
    const [mode, setMode] = useState<gridMode>("idle");
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [battleMap, dispatch] = useReducer(
        gridReducer,
        buildGrid(items, dimensions, src)
    );
    const [isDrawerOpen, setisDrawerOpen] = useState(false)


    const handleGridClick = useCallback((item: gridItem) => {
        if ((mode === "addingPlayer" || mode === "addingNPC") && item.type === 'empty') {
            setSelectedItem(item);
            setCanSubmit(true);
        }
        else if (mode === "moving" && selectedItem && item.type === 'empty') {
            dispatch({ type: "MOVE_ITEM", from: selectedItem, to: item });
            setMode("idle");
            setSelectedItem(null);
        }
        else if (mode !== "moving" && item.type !== 'empty') {
            setSelectedItem(item);
            setCanSubmit(true);
        }
        console.log(selectedItem);
    }, [selectedItem, mode]);

    const clickAddPlayer = useCallback(() => {
        setSelectedItem(null);
        setisDrawerOpen(false);
        setMode("addingPlayer");
    }, []);

    const submitAddPlayer = useCallback((formData: FormData) => {
        if (selectedItem) {
            dispatch({ type: "ADD_PLAYER", formData: formData, x: selectedItem.position.x, y: selectedItem.position.y });
            setMode("idle");
            setSelectedItem(null);
            setCanSubmit(false);
            setisDrawerOpen(false);
        }
    }, []);

    const clickAddNPC = useCallback(() => {
        setSelectedItem(null);
        setisDrawerOpen(false);
        setMode("addingNPC");
    }, []);

    const submitAddNPC = useCallback((formData: FormData) => {
        if (selectedItem) {
            dispatch({ type: "ADD_NPC", formData: formData, x: selectedItem.position.x, y: selectedItem.position.y });
            setMode("idle");
            setSelectedItem(null);
            setCanSubmit(false);
            setisDrawerOpen(false);
        }
    }, []);

    const clickRemoveItem = useCallback(() => {
        setSelectedItem(null);
        setisDrawerOpen(false);
        setMode("removing");
    }, []);

    const submitRemoveItem = useCallback(() => {
        if (selectedItem) {
            dispatch({ type: "REMOVE_ITEM", x: selectedItem.position.x, y: selectedItem.position.y });
            setMode("idle");
            setSelectedItem(null);
            setCanSubmit(false);
            setisDrawerOpen(false);
        }
    }, []);

    return {
        battleMap,
        mode,
        canSubmit,
        selectedItem,
        isDrawerOpen,
        clickAddPlayer,
        submitAddPlayer,
        clickAddNPC,
        submitAddNPC,
        clickRemoveItem,
        submitRemoveItem,
        handleGridClick
    };

};
