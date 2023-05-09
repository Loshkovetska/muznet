import React from "react";
import { Dimensions } from "react-native";

import { useEffect } from "react";
import { useState } from "react";
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown";

// Images
import IMAGES from "@/res/images"
const {
    SearchIcon,
    CrossBlackIcon,
    CrossGrayIcon
} = IMAGES;

import C from "@/res/colors"

// Styles
import { style } from "./style"
const {
    Container,
    SearchInputBlock,
    SearchInput,
    SearchIconBlock,
    SearchRemoveIconBlock,
    // Item
    ChosenBlock,
    ChoosenScrollView,
    ChosenBlockBorderBottom,
    Item,
    ChosenItem,
    ItemText,
    RemoveChosenItem,
} = style;

const SelectWithSearch = ({ dataForChoose, searchPlaceholder, getChosenData, alreadyChosenInstrument }) => {
    const window = Dimensions.get("window");
    const [dimensions, setDimensions] = useState({ window });
    const windowHeight = Math.round(dimensions.window.height)
    const isKeyboardOpen = isKeyboardShown()

    const containerHeight = windowHeight - 362

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window }) => {
                setDimensions({ window });
            }
        );
        return () => subscription?.remove();
    });

    // Local state
    const [chosenBlock, setChoosenBlock] = useState([]);
    const [localChooseData, setLocalChooseData] = useState([]);

    const [init, setInit] = useState(0);
    useEffect(() => {
        if (init === 0) {
            setLocalChooseData(dataForChoose)
            setInit(1)
        }
    }, [init, dataForChoose]);

    const [filteredChooseData, setFilteredChooseData] = useState([]);

    const [searchText, onChangeSearchText] = useState("");

    const isFilter = searchText.length > 0

    const compareLetterNumber = searchText.length
    useEffect(() => {
        if (init > 0) {
            if (isFilter) {
                const newLocalData = localChooseData.map((item) => {
                    const slicedItem = item.slice(0, compareLetterNumber).toLowerCase()
                    if (slicedItem.includes(searchText.toLowerCase())) {
                        return item
                    } else {
                        return
                    }
                })
                setFilteredChooseData(newLocalData)
            } else {
                setFilteredChooseData(localChooseData)
            }
        }

    }, [searchText, chosenBlock, init]);

    const handler = ({ value, action }) => {

        switch (action) {
            // Add to chosen
            case "add":
                setChoosenBlock([...chosenBlock, value])
                // Push to form
                getChosenData([...chosenBlock, value])
                // Find in not choose
                const newLocalData = localChooseData.filter((item) => item !== value)
                const newFilteredLocalData = filteredChooseData.filter((item) => item !== value)
                // Remove from not choose
                setLocalChooseData(newLocalData)
                setFilteredChooseData(newFilteredLocalData)
                break;
            // Remove from chosen
            case "remove":
                // Find in chosen
                const newChosenData = chosenBlock.filter((item) => item !== value)
                // Remove from chosen
                setChoosenBlock(newChosenData)
                // Push to form
                getChosenData(newChosenData)

                // Return to not chosen
                setLocalChooseData([value, ...localChooseData])
                setFilteredChooseData([value, ...filteredChooseData])
                break;
        }
    }

    const isFiltered = isFilter ? filteredChooseData : localChooseData

    return (
        <Container
            style={{
                marginBottom: isKeyboardOpen === true ? 90 : 120,
            }}
        >
            {/* Search Input */}
            <SearchInputBlock>

                <SearchIconBlock>
                    <SearchIcon width={14} height={14} />
                </SearchIconBlock>

                <SearchRemoveIconBlock onPress={() => onChangeSearchText("")}   >
                    <CrossBlackIcon width={15} height={15} />
                </SearchRemoveIconBlock>

                <SearchInput
                    value={searchText}
                    cursorColor={C.inputCursor}
                    selectionColor={C.lightGray}
                    placeholder={searchPlaceholder}
                    keyboardType="default"
                    onChangeText={onChangeSearchText}
                />
            </SearchInputBlock>
            {/* Choose block */}
            <ChoosenScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={{ height: containerHeight }}
            >
                {chosenBlock.length > 0 &&
                    <ChosenBlock isChosen={true}>
                        {chosenBlock.map((item, key) => {

                            return (item !== undefined && <ChosenItem key={key} isChosen={true}>
                                <ItemText isChosen={true}>
                                    {item}
                                </ItemText>
                                <RemoveChosenItem
                                    onPress={() => {
                                        handler({
                                            value: item,
                                            action: "remove"
                                        })
                                    }}
                                >
                                    <CrossGrayIcon width={15} height={15} />
                                </RemoveChosenItem>

                            </ChosenItem>)
                        })}
                        <ChosenBlockBorderBottom></ChosenBlockBorderBottom>
                    </ChosenBlock>
                }

                <ChosenBlock>
                    {isFiltered.map((item, key) => {

                        return (item !== undefined && <Item key={key}
                            onPress={() => {
                                onChangeSearchText("")
                                handler({
                                    value: item,
                                    action: "add"
                                })
                            }}
                        >
                            <ItemText >
                                {item}
                            </ItemText>

                        </Item>)
                    })}
                </ChosenBlock>
            </ChoosenScrollView>

        </Container>

    )
}

export default SelectWithSearch;