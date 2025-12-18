cmake_minimum_required(VERSION 3.16)
project(spout_bridge LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(spout_bridge SHARED
  spout_bridge.cpp
)

# Point these to wherever you vendored Spout headers/sources.
target_include_directories(spout_bridge PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}
  ${CMAKE_CURRENT_SOURCE_DIR}/../spout2/SPOUTSDK/SpoutGL
  ${CMAKE_CURRENT_SOURCE_DIR}/../spout2/SPOUTSDK/SpoutLibrary
)

# You may need to compile/link additional Spout SDK .cpp files directly
# if SpoutSender is not header-only in the subset you copied.
# Example:
# target_sources(spout_bridge PRIVATE
#   ../spout2/SPOUTSDK/SpoutGL/SpoutSender.cpp
#   ../spout2/SPOUTSDK/SpoutLibrary/SpoutSharedMemory.cpp
# )

# Common Windows libs (usually needed for Spout internals)
if (WIN32)
  target_link_libraries(spout_bridge PRIVATE
    opengl32
    user32
    gdi32
  )
endif()
