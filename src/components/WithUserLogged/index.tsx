import { NextPage } from 'next'

export default (
  WrappedComponent: NextPage
): {
  ({ ...props }: { [x: string]: any }): JSX.Element
  getInitialProps(
    context: any
  ): Promise<{
    isLogged: boolean
  }>
} => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

  hocComponent.getInitialProps = async context => {
    const isLogged = true

    // Are you an authorized user or not?
    if (isLogged) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: '/'
        })
        context.res?.end()
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        logged: isLogged
      })
      return { ...wrappedProps, isLogged }
    }

    return { isLogged }
  }

  return hocComponent
}
