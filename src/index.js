import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Icon,
  Button,
} from "@wordpress/components";
import "./index.scss";

// const ourStartFunction = () => {
//   let locked = false;

//   wp.data.subscribe(() => {
//     // Check if there are blocks with specific conditions
//     const hasCorrectAnswer = wp.data
//       .select("core/block-editor")
//       .getBlocks()
//       .some(
//         (block) =>
//           block.name === "ourplugin/are-you-paying-attention" &&
//           block.attributes.correctAnswer
//       );

//     if (hasCorrectAnswer && !locked) {
//       locked = true;
//       wp.data.dispatch("core/editor").lockPostSaving();
//       console.log("Post saving locked.");
//     }

//     if (!hasCorrectAnswer && locked) {
//       locked = false;
//       wp.data.dispatch("core/editor").unlockPostSaving();
//       console.log("Post saving unlocked.");
//     }
//   });
// };

// ourStartFunction();

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: [""] },
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

    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
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
