import type { OGTemplate, OGTheme } from './types'

export class DefaultOGTemplate implements OGTemplate {
  private title: string
  private description: string
  private theme: OGTheme

  constructor(title: string, description: string, theme: OGTheme) {
    this.title = title
    this.description = description
    this.theme = theme
  }

  getTheme(): OGTheme {
    return this.theme
  }

  render() {
    return {
      type: 'div',
      props: {
        style: {
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: this.theme.backgroundColor,
          backgroundImage: this.theme.backgroundGradient,
          fontFamily: 'Noto Sans SC',
        },
        children: [
          // Background watermark left top
          this.theme.logoBase64
            ? {
                type: 'img',
                props: {
                  src: this.theme.logoBase64,
                  style: {
                    position: 'absolute',
                    left: '-150px',
                    top: '-150px',
                    width: '500px',
                    height: '500px',
                    opacity: 0.06,
                    transform: 'rotate(15deg)',
                  },
                },
              }
            : null,
          // Background watermark right bottom
          this.theme.logoBase64
            ? {
                type: 'img',
                props: {
                  src: this.theme.logoBase64,
                  style: {
                    position: 'absolute',
                    right: '-150px',
                    bottom: '-150px',
                    width: '500px',
                    height: '500px',
                    opacity: 0.06,
                    transform: 'rotate(-15deg)',
                  },
                },
              }
            : null,
          // Content Layout (Centered text container)
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                paddingLeft: '120px',
                paddingRight: '120px',
                width: '100%',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '72px',
                      fontWeight: 'bold',
                      color: this.theme.textColor,
                      lineHeight: 1.25,
                      marginBottom: '24px',
                      letterSpacing: '2px',
                    },
                    children: this.title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '32px',
                      color: this.theme.mutedTextColor,
                      lineHeight: 1.45,
                    },
                    children: this.description,
                  },
                },
              ],
            },
          },
        ],
      },
    }
  }
}

export class PostOGTemplate implements OGTemplate {
  private title: string
  private publishDate: string | undefined
  private theme: OGTheme

  constructor(title: string, publishDate: string | undefined, theme: OGTheme) {
    this.title = title
    this.publishDate = publishDate
    this.theme = theme
  }

  getTheme(): OGTheme {
    return this.theme
  }

  render() {
    const subtitle = this.publishDate
      ? `${this.publishDate}  ·  ${this.theme.brandName}`
      : this.theme.brandName

    return {
      type: 'div',
      props: {
        style: {
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: this.theme.backgroundColor,
          backgroundImage: this.theme.backgroundGradient,
          fontFamily: 'Noto Sans SC',
        },
        children: [
          // Background watermark left top
          this.theme.logoBase64
            ? {
                type: 'img',
                props: {
                  src: this.theme.logoBase64,
                  style: {
                    position: 'absolute',
                    left: '-150px',
                    top: '-150px',
                    width: '500px',
                    height: '500px',
                    opacity: 0.06,
                    transform: 'rotate(15deg)',
                  },
                },
              }
            : null,
          // Background watermark right bottom
          this.theme.logoBase64
            ? {
                type: 'img',
                props: {
                  src: this.theme.logoBase64,
                  style: {
                    position: 'absolute',
                    right: '-150px',
                    bottom: '-150px',
                    width: '500px',
                    height: '500px',
                    opacity: 0.06,
                    transform: 'rotate(-15deg)',
                  },
                },
              }
            : null,
          // Content Layout (Centered text container)
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                paddingLeft: '120px',
                paddingRight: '120px',
                width: '100%',
              },
              children: [
                // Article Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '56px',
                      fontWeight: 'bold',
                      color: this.theme.textColor,
                      lineHeight: 1.35,
                      marginBottom: '28px',
                    },
                    children: this.title,
                  },
                },
                // Meta Info (Publish Date & Site Name)
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '28px',
                      color: this.theme.mutedTextColor,
                    },
                    children: subtitle,
                  },
                },
              ],
            },
          },
        ],
      },
    }
  }
}
