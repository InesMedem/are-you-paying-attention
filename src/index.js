import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Icon,
  Button,
} from "@wordpress/components";
import "./index.scss";

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: ["red", "blue"] },
    correctAnswer: { type: "number", default: "undefined" },
  },
  edit: EditComponent,
  save: function (props) {
    return null;
  },
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(function (x, index) {
      return index != indexToDelete;
    });
    props.setAttributes({ answers: newAnswers });
  }

  // if you are the same value as what came though the onChange (index) event , ie value == index then mark as correct
  function markAsCorrect(index) {
    props.setAttributes({ correctAnswer: index });
  }

  return (
    <div className="paying-attention-edit-block">
      <TextControl
        label="Question:"
        value={props.attributes.question}
        onChange={updateQuestion}
      />
      <p>Answers: </p>
      {props.attributes.answers.map(function (answers, index) {
        return (
          <Flex>
            <FlexBlock>
              <TextControl
                // autoFocus={answers == undefined}
                value={answers}
                onChange={(newValue) => {
                  const newAnswers = [...props.attributes.answers];
                  newAnswers[index] = newValue;
                  props.setAttributes({ answers: newAnswers });
                }}
              />
            </FlexBlock>
            <FlexItem>
              <Button onClick={() => markAsCorrect(index)}>
                <Icon
                  icon={
                    props.attributes.correctAnswer == index
                      ? "star-filled"
                      : "star-empty"
                  }
                ></Icon>
              </Button>
            </FlexItem>
            <FlexItem>
              <Button onClick={() => deleteAnswer(index)}>Delete</Button>
            </FlexItem>
          </Flex>
        );
      })}
      <Button
        isPrimary
        onClick={() => {
          props.setAttributes({ answers: [...props.attributes.answers, ""] });
        }}
      >
        Add another answer
      </Button>
    </div>
  );
}
