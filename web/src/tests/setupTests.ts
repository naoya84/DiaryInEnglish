import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

export default function setup(jsx: JSX.Element) {
    return {
        user: userEvent.setup(),
        ...render(jsx)
    }
}