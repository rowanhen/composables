import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoices,
	QuestionnaireItem,
	QuestionnaireItems,
	QuestionnaireSubmit,
	QuestionnaireTitle,
} from '@leitware/composables'

const meta = { title: 'Components/Questionnaire' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Questionnaire',
	render: () => (
		<Questionnaire
			items={[{ name: 'plan', required: true, choices: ['personal', 'team'] }]}
			onSubmit={(event) => event.preventDefault()}
		>
			<QuestionnaireItems>
				<QuestionnaireItem name="plan">
					<QuestionnaireTitle>Who is this workspace for?</QuestionnaireTitle>
					<QuestionnaireChoices>
						<QuestionnaireChoice value="personal">Personal projects</QuestionnaireChoice>
						<QuestionnaireChoice value="team">My team</QuestionnaireChoice>
					</QuestionnaireChoices>
				</QuestionnaireItem>
			</QuestionnaireItems>
			<QuestionnaireActions>
				<QuestionnaireSubmit>Finish</QuestionnaireSubmit>
			</QuestionnaireActions>
		</Questionnaire>
	),
}
