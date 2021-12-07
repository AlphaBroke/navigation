import { createStore } from 'redux'
import * as R from 'ramda'

const workout = {
  props: {
    name: {
      component: 'input',
      lens: {
        key: 'prop',
        propname: 'name'
      }
    },
    plans: {
      component: 'list',
      lens: {
        key: 'fromTo',
        from: 'user',
        to: 'plan'
      },
      items: {
        props: {
          title: {
            component: 'input',
            lens: {
              key: 'prop',
              propname: 'title'
            }
          },
          exercises: {
            component: 'list',
            lens: {
              key: 'fromTo',
              from: 'plan',
              to: 'exercise'
            },
            items: {
              props: {
                title: {
                  component: 'input',
                  lens: {
                    key: 'prop',
                    propname: 'title'
                  }
                },
                description: {
                  component: 'input',
                  lens: {
                    key: 'prop',
                    propname: 'description'
                  }
                },
                sets: {
                  component: 'list',
                  lens: {
                    key: 'fromTo',
                    from: 'exercise',
                    to: 'set'
                  },
                  items: {
                    props: {
                      volume: {
                        component: 'input',
                        lens: {
                          key: 'prop',
                          propname: 'volume'
                        }
                      },
                      intensity: {
                        component: 'input',
                        lens: {
                          key: 'prop',
                          propname: 'intensity'
                        }
                      },
                      restTime: {
                        component: 'input',
                        lens: {
                          key: 'prop',
                          propname: 'restTime'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function myReducer(state = workout, { type, blockComp, propName, blockPath, toType, fromType }) {
  switch (type) {
    case 'ADD_PROP_BLOCK':
      const newBlock = {
        component: blockComp,
        lens: {
          key: 'prop',
          propname: propName
        }
      }
      return R.assocPath(R.append(propName, blockPath), newBlock, state)

    case 'ADD_FROMTO_BLOCK':
      const newFTBlock = {
        component: blockComp,
        lens: {
          key: 'fromTo',
          from: fromType,
          to: toType
        },
        items: {
          props: {}
        }
      }
      return R.assocPath(R.append(propName, blockPath), newFTBlock, state)
    case 'DELETE_BLOCK':
      return R.dissocPath(blockPath, state)
    default:
      return state
  }
}

export function configureStore(preloadedState) {
  return createStore(myReducer, preloadedState)
}
