import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useCallback, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { PriorityEnum } from "../constants/todos";
import React from "react";

const buildFormTodo = (todo) => ({
  title: todo.title,
  priority: todo.priority,
  due_date: new Date(todo.due_date),
});

export const EditTodoModal = ({ todo, updateTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [formTodo, setFormTodo] = useState(() => buildFormTodo(todo));
  const [errors, setErrors] = useState({});
  const [dueDateChanged, setDueDateChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = useCallback(() => {
    setFormTodo(buildFormTodo(todo));
    setErrors({});
    setDueDateChanged(false);
    onOpen();
  }, [todo, onOpen]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formTodo.title.trim()) {
      newErrors.title = "Task title cannot be empty.";
    } else if (formTodo.title.trim().length < 3) {
      newErrors.title =
        "Task title must be at least 3 characters long.";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDateChanged && formTodo.due_date < today) {
      newErrors.due_date = "Due date cannot be in the past.";
    }

    return newErrors;
  }, [dueDateChanged, formTodo]);

  const handleSubmit = useCallback(() => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    updateTodo(todo.id, formTodo)
      .then(() => {
        onClose();
      })
      .catch(() => {
        // Error toast is shown by handleUpdateTodo; keep the modal open with the user's changes.
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [formTodo, onClose, todo.id, updateTodo, validateForm]);

  return (
    <>
      <IconButton
        aria-label="Edit todo"
        icon={<FaEdit />}
        isRound="true"
        onClick={handleOpen}
      />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.title} isRequired>
              <FormLabel>Edit task</FormLabel>
              <Input
                ref={initialRef}
                variant="filled"
                placeholder="Edit task"
                value={formTodo.title}
                maxLength="100"
                onChange={(e) => {
                  setFormTodo({
                    ...formTodo,
                    title: e.target.value,
                  })
                  setErrors({ ...errors, title: null });
                }}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Priority</FormLabel>
              <Select
                value={formTodo.priority}
                onChange={(e) =>
                  setFormTodo({
                    ...formTodo,
                    priority: e.target.value,
                  })
                }
              >
                <option value={PriorityEnum.HIGH.toLocaleLowerCase()}>{PriorityEnum.HIGH}</option>
                <option value={PriorityEnum.MEDIUM.toLocaleLowerCase()}>{PriorityEnum.MEDIUM}</option>
                <option value={PriorityEnum.LOW.toLocaleLowerCase()}>{PriorityEnum.LOW}</option>
              </Select>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.due_date} isRequired>
              <FormLabel>Due Date</FormLabel>
              <SingleDatepicker
                name="date-input"
                date={formTodo.due_date}
                onDateChange={(selectedDate) => {
                  setFormTodo({
                    ...formTodo,
                    due_date: selectedDate,
                  })
                  setDueDateChanged(true);
                  setErrors({ ...errors, due_date: null });
                }}
              />
              <FormErrorMessage>{errors.due_date}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3} isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose} isDisabled={isSubmitting}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
