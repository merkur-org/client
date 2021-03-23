import { NextPage } from 'next'

export default (
  WrappedComponent: NextPage
): {
  ({ ...props }: { [x: string]: any }): JSX.Element
  getInitialProps(
    context: any
  ): Promise<{
    userIsAuth: boolean
  }>
} => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

  hocComponent.getInitialProps = async context => {
    const userIsAuth = true

    // Are you an authorized user or not?
    if (!userIsAuth) {
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
        auth: userIsAuth
      })
      return { ...wrappedProps, userIsAuth }
    }

    return { userIsAuth }
  }

  return hocComponent
}
