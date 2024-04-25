import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { DragEvent } from 'react'
import {
  DEFAULT_ANSWER_OBJECT,
  DEFAULT_MODULE_OBJECT,
  DEFAULT_QUESTION_OBJECT,
} from './SectionForm.constants'
import { FormValues } from './module/Module.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'

interface UseSectionFormProps {
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>
}
export default function useSectionForm({
  sectionFormMethods,
}: UseSectionFormProps) {
  const { fields, append, move, remove, update } = useFieldArray({
    control: sectionFormMethods.control,
    name: 'sections',
  })

  // Add a new module to the form
  const handleAddModule = () => {
    append(DEFAULT_MODULE_OBJECT)
  }

  // remove a module from the form
  const handleRemoveModule = (index: number) => {
    remove(index)
  }

  // drop module to a new index
  const onDrop = (event: DragEvent<HTMLDivElement>, dropIndex: number) => {
    event.preventDefault()
    const dragIndex = parseInt(event.dataTransfer.getData('text/plain'))
    if (dragIndex !== dropIndex) {
      move(dragIndex, dropIndex)
    }
  }

  // Add a new question to the module
  const handleAddQuestion = (index: number) => {
    // Watch over the section object at the index
    const fieldToUpdate = sectionFormMethods.watch(`sections.${index}`)

    // Update the Fields with the new object at the same index
    // With the new question added to the questions array
    update(index, {
      ...fieldToUpdate,
      quiz: {
        questions: [...fieldToUpdate.quiz.questions, DEFAULT_QUESTION_OBJECT],
      },
    })
  }

  // Remove a quiz from the module
  const handleRemoveQuiz = (index: number) => {
    const fieldToUpdate = sectionFormMethods.watch(`sections.${index}`)
    update(index, {
      ...fieldToUpdate,
      quiz: {
        questions: [
          {
            question: GLOBAL_VARIABLES.EMPTY_STRING,
            type: QuestionTypeEnum.BINARY,
            isValid: 0,
            answers: [
              {
                answer: GLOBAL_VARIABLES.EMPTY_STRING,
                isValid: 0,
              },
              {
                answer: GLOBAL_VARIABLES.EMPTY_STRING,
                isValid: 0,
              },
            ],
          },
        ],
      },
    })
  }

  // Remove a question from the module
  const handleRemoveQuestion = (
    sectionIndex: number,
    questionIndex: number,
  ) => {
    const fieldToUpdate = sectionFormMethods.watch(`sections.${sectionIndex}`)
    const updatedQuestions = [
      ...fieldToUpdate.quiz.questions.slice(0, questionIndex),
      ...fieldToUpdate.quiz.questions.slice(questionIndex + 1),
    ]

    update(sectionIndex, {
      ...fieldToUpdate,
      quiz: {
        ...fieldToUpdate.quiz,
        questions: updatedQuestions,
      },
    })
  }

  // Remove an answer from the question
  const handleRemoveAnswer = (
    sectionIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => {
    const fieldToUpdate = sectionFormMethods.watch(`sections.${sectionIndex}`)
    const updatedAnswers = [
      ...fieldToUpdate.quiz.questions[questionIndex].answers.slice(
        0,
        answerIndex,
      ),
      ...fieldToUpdate.quiz.questions[questionIndex].answers.slice(
        answerIndex + 1,
      ),
    ]

    update(sectionIndex, {
      ...fieldToUpdate,
      quiz: {
        ...fieldToUpdate.quiz,
        questions: [
          ...fieldToUpdate.quiz.questions.slice(0, questionIndex),
          {
            ...fieldToUpdate.quiz.questions[questionIndex],
            answers: updatedAnswers,
          },
          ...fieldToUpdate.quiz.questions.slice(questionIndex + 1),
        ],
      },
    })
  }

  // Add an answer to the question
  const handleAddAnswer = (sectionIndex: number, questionIndex: number) => {
    const fieldToUpdate = sectionFormMethods.watch(`sections.${sectionIndex}`)
    const updatedAnswers = [
      ...fieldToUpdate.quiz.questions[questionIndex].answers,
      DEFAULT_ANSWER_OBJECT,
    ]

    update(sectionIndex, {
      ...fieldToUpdate,
      quiz: {
        questions: fieldToUpdate.quiz.questions.map((question, index) => {
          if (index === questionIndex) {
            return {
              ...question,
              answers: updatedAnswers,
            }
          }
          return question
        }),
      },
    })
  }

  // Add external URL to the module
  const handleAddExternalUrl = (index: number) => {
    const fieldToUpdate = sectionFormMethods.watch(`sections.${index}`)
    if (!fieldToUpdate.externalUrls) {
      fieldToUpdate.externalUrls = []
      return
    }
    update(index, {
      ...fieldToUpdate,
      externalUrls: [
        ...fieldToUpdate.externalUrls,
        {
          id: 0,
          url: GLOBAL_VARIABLES.EMPTY_STRING,
          title: GLOBAL_VARIABLES.EMPTY_STRING,
        },
      ],
    })
  }

  // remove external URL from the module
  const handleRemoveExternalUrl = (index: number, externalUrlIndex: number) => {
    const fieldToUpdate = sectionFormMethods.watch(`sections.${index}`)
    if (!fieldToUpdate.externalUrls) {
      fieldToUpdate.externalUrls = []
    }
    const updatedExternalUrls = [
      ...fieldToUpdate.externalUrls.slice(0, externalUrlIndex),
      ...fieldToUpdate.externalUrls.slice(externalUrlIndex + 1),
    ]

    update(index, {
      ...fieldToUpdate,
      externalUrls: updatedExternalUrls,
    })
  }

  return {
    fields,
    handleAddModule,
    handleRemoveModule,
    onDrop,
    handleAddQuestion,
    handleRemoveQuestion,
    handleRemoveAnswer,
    handleAddAnswer,
    handleAddExternalUrl,
    handleRemoveExternalUrl,
    handleRemoveQuiz,
  }
}
