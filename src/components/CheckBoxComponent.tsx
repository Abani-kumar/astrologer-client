import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';

interface Option {
  id: number;
  label: string;
}
interface CheckBoxComponentProps {
  options: Option[];
  selectedValues: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  title: string;
}

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({
  options,
  selectedValues,
  onAdd,
  onRemove,
  title,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleOption = (label: string) => {
    if (selectedValues.includes(label)) {
      onRemove(label);
    } else {
      onAdd(label);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Filter out any empty strings from selectedValues before displaying them
  const validSelectedValues = selectedValues.filter(value => value.trim() !== "");

  const displayValue = validSelectedValues.length > 0
    ? validSelectedValues.join(", ")
    : title;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={{ color: "black" }}>
          {displayValue}
        </Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isDropdownVisible}
          onRequestClose={toggleDropdown}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
            <View style={styles.modalContent}>
              <ScrollView>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.checkboxContainer}
                    onPress={() => toggleOption(option.label)}
                  >
                    <View style={styles.checkbox}>
                      {validSelectedValues.includes(option.label) && (
                        <View style={styles.checkboxChecked} />
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "99%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    maxHeight: 400,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: "blue",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "black",
  },
});

export default CheckBoxComponent;
